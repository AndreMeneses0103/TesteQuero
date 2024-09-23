import { FC } from "react";
import QText from "./QText";
import QIconStar from "./QIconStar";

interface QBadgeProps {
  rating: number;
}

const QRating: FC<QBadgeProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);


  return (
    <div className="flex items-center gap-2">
      <QText tag="span">{rating}</QText>
      <div className="flex items-center space-x-1 text-yellow-500">
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <QIconStar key={`full-${index}`} />
          ))}

        {hasHalfStar && <QIconStar half />}

        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <QIconStar key={`empty-${index}`}/>
          ))}
      </div>
    </div>
  );
};

export default QRating;
