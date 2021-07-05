import { HeroIcon } from "../types/index";

const HeaderItem = ({ Icon, title }: { Icon: HeroIcon; title: string }) => (
  <div className="flex flex-col items-center group hover:opacity-50 duration-300">
    <Icon className="h-5 text-purple-500 group-hover:animate-bounce mb-1" />
    <p className="text-xs">{title}</p>
  </div>
);

export default HeaderItem;
