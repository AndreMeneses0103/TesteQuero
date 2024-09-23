import { FC } from "react";
import QHeading from "./QHeading";
import QInputRadio from "./QInputRadio";

interface QFormOrderByProps{
  onSelect: (value: string) => void;
}

const QFormOrderByOffer: FC<QFormOrderByProps> = ({onSelect}) => {


  return (
    <form action="#">
      <QHeading
        tag="h2"
        size="sm"
        className="mb-2"
      >
        Ordenar
      </QHeading>
      
      <QInputRadio
        label="Cursos de A-Z"
        name="order-by"
        value="course-name"
        checked
        onChange={ () => onSelect("course-name") }
      />
      
      <QInputRadio
        label="Menor preço"
        name="order-by"
        value="price"
        onChange={ () => onSelect("price") }
      />
      
      <QInputRadio
        label="Melhor avaliados"
        name="order-by"
        value="rating"
        onChange={ () => onSelect("rating") }
      />
    </form>
  );
};

export default QFormOrderByOffer;
