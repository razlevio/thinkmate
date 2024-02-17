"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export function LandingHero() {
  const { isSignedIn } = useAuth();

	const examplePrompts = [
		"fusion dishes blending Italian and Japanese cuisines",
		"Ideas to make comfort foods healthier",
		"Unique ice cream flavor combinations",
		"Themed at-home date night ideas",
		"Outdoor date activities for nature lovers",
		"Philosophical questions unanswered by technology",
		"Applying ancient philosophies to modern dilemmas",
		"Finding meaning in a digital world",
		"Using digital media for a positive legacy",
		"Unique DIY tech-craft projects",
		"Fun, unconventional physical activities",
		"Under-the-radar unique travel destinations",
		"Beyond-the-norm romantic gestures",
		"Couple growth and learning ideas",
		"Adventure and exploration in relationships",
		"Creative boundary-pushing challenges",
		"Accessible 'bucket list' experiences",
		"Ways to make my morning routine more energizing",
		"Quick healthy dinner recipes for busy weeknights",
		"Creative home office setup ideas",
		"Fun weekend projects for DIY enthusiasts",
		"Effective stress-relief techniques for professionals",
		"Innovative ways to stay fit without a gym",
		"Ideas for virtual team-building activities",
		"Unique themes for a friend's party",
		"Ideas to improve personal finance management",
		"Ideas to enhance creativity in daily tasks",
		"Ideas for upcycling household items into art",
		"Travel-themed date night ideas at home",
		"Mindfulness exercises for beginners",
		"Homemade natural beauty treatment recipes",
		"Ideas to make learning a new concept fun and effective",
	]

  return (
    <div className="space-y-5 py-36 text-center font-bold">
      <div className="space-y-5 text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
        <h1>The Best AI Idea Generator</h1>
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          <TypewriterComponent
            options={{
              strings: examplePrompts,
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm font-light text-zinc-400 md:text-xl">
        Create content using AI 10x faster.
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="premium" className="rounded-full p-4 font-semibold md:p-6 md:text-lg">
            Start Generating For Free
          </Button>
        </Link>
      </div>
      <div className="text-xs font-normal text-zinc-400 md:text-sm">
        No credit card required.
      </div>
    </div>
  );
};
