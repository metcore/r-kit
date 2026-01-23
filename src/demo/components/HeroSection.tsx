import { Hero } from "../../components/hero";
import { Text } from "../../components/text";

interface Props {
  title: string;
  subtitle: string;
  description: string;
  illust: string;
}

export default function HeroSection({
  title,
  subtitle,
  description,
  illust,
}: Props) {
  return (
    <Hero className="relative mb-4 flex gap-5 overflow-hidden">
      <div className="flex flex-1 flex-col gap-2">
        <Text
          as={"h5"}
          value={title}
          weight="medium"
          className="text-gray-800"
        />
        <Text
          as={"h1"}
          variant="h1"
          weight="bold"
          className="text-gray-900"
          value={subtitle}
        />
        <Text className="text-gray-800" value={description} />
      </div>

      <img
        src={illust}
        alt="page illustration"
        className="relative z-10 w-[230px] object-contain"
      />

      <div className="bg-info-500 absolute right-10 bottom-0 h-36 w-36 translate-y-[calc(50%+1rem)] rounded-full" />
    </Hero>
  );
}
