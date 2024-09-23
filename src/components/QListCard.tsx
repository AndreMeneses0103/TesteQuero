import { ReactNode, HTMLAttributes } from "react";

interface Card extends HTMLAttributes<HTMLElement> {
  id: string;
}

interface QListCardProps<T extends Card> {
  cards: T[];
  children: (card: T) => ReactNode;
}

const QListCard = <T extends Card>({
  cards,
  children,
  ...rest
}: QListCardProps<T>) => {
  return (
    <ul className="flex flex-wrap"
      {...rest}
    >
      {cards.map((card) => (
        <li key={card.id} className="p-4">{children(card)}</li>
      ))}
    </ul>
  );
};

export default QListCard;
