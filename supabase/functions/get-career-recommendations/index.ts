import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RequestPayload {
  interest: string;
  skills: string[];
  educationLevel: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { interest, skills, educationLevel }: RequestPayload = await req.json();

    const interestLower = interest.toLowerCase();
    const skillsLower = skills.map(s => s.toLowerCase());

    const { data: allCareers, error: fetchError } = await supabase
      .from("careers")
      .select("*");

    if (fetchError) {
      throw fetchError;
    }

    const scoredCareers = allCareers.map((career) => {
      let score = 0;

      career.keywords.forEach((keyword: string) => {
        if (interestLower.includes(keyword.toLowerCase())) {
          score += 10;
        }
      });

      skillsLower.forEach((skill) => {
        career.required_skills.forEach((reqSkill: string) => {
          if (reqSkill.toLowerCase().includes(skill) || skill.includes(reqSkill.toLowerCase())) {
            score += 5;
          }
        });
      });

      return { ...career, score };
    });

    scoredCareers.sort((a, b) => b.score - a.score);

    const topCareers = scoredCareers.filter(c => c.score > 0).slice(0, 3);

    const recommendedCareers = topCareers.length > 0
      ? topCareers
      : scoredCareers.slice(0, 3);

    const careerIds = recommendedCareers.map(c => c.id);

    const { error: insertError } = await supabase
      .from("user_submissions")
      .insert({
        interest,
        skills,
        education_level: educationLevel,
        recommended_careers: careerIds,
      });

    if (insertError) {
      console.error("Error saving submission:", insertError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        careers: recommendedCareers.map(({ score, ...career }) => career)
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
