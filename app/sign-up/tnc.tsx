import { Alien, SpeechBallon, Robot, OneOclock, HeartWithRibbon, GirlLightSkinTone } from "@/components/emoji";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  setConfirm: React.Dispatch<React.SetStateAction<any>>;
};

export default function TermsAndCondition({ setConfirm }: Props) {
  return (
    <div className="xs:py-2 py-4 h-screen inline-flex flex-row justify-center items-center xs:my-0 my-6">
      <div className="flex flex-col gap-y-2 md:w-1/2 w-full">
        <h2 className="text-xl font-semibold text-grey-1">Before you join</h2>
        <p>GreenGive is all about building strong communities where we share more and waste less. That way, we can help each other and the planet.</p>
        <p className="my-4">Please agree to our community pledge:</p>

        <div className="inline-flex flex-col gap-x-3 mb-2">
          <div className="inline-flex flex-row items-center">
            <SpeechBallon className="w-5 h-5 mr-1" />
            <div className="font-semibold">Communication</div>
          </div>
          <p>Be clear, polite and friendly with other users.</p>
        </div>

        <div className="inline-flex flex-col gap-x-3 mb-2">
          <div className="inline-flex flex-row items-center">
            <OneOclock className="w-5 h-5 mr-1" />
            <div className="font-semibold">Time</div>
          </div>
          <p>Please don&apos;t be late for pickups. No-shows are not cool and won&apos;t be tolerated.</p>
        </div>

        <div className="inline-flex flex-col gap-x-3 mb-2">
          <div className="inline-flex flex-row items-center">
            <HeartWithRibbon className="w-5 h-5 mr-1" />
            <div className="font-semibold">Posts</div>
          </div>
          <p>Try to keep them positive and constructive.</p>
        </div>

        <div className="inline-flex flex-col gap-x-3 mb-2">
          <div className="inline-flex flex-row items-center">
            <GirlLightSkinTone className="w-5 h-5 mr-1" />
            <Alien className="w-5 h-5 mr-1" />
            <Robot className="w-5 h-5 mr-1" />
            <div className="font-semibold">Inclusive</div>
          </div>
          <p>GreenGive is for everyone</p>
        </div>

        <p className="mt-2">Happy with the rules? Then come on in.</p>

        <Button className="rounded-3xl h-auto py-2.5 mt-2 mb-1" onClick={() => setConfirm(true)}>
          I agree
        </Button>
        <Button asChild variant="outline" className="rounded-3xl h-auto py-2.5 border-primary text-primary hover:text-primary font-semibold">
          <Link href="/">Cancel sign up</Link>
        </Button>
      </div>
    </div>
  )
}