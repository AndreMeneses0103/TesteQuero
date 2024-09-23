import { useEffect, useState } from "react";

import QHeader from "./components/QHeader";
import QInput from "./components/QInput";
import QButton from "./components/QButton";
import QCardOffer from "./components/QCardOffer";
import QFooter from "./components/QFooter";
import QLayout from "./components/QLayout";
import QListCard from "./components/QListCard";
import QFormOrderByOffer from "./components/QFormOrderByOffer";
import QFormFilterOffer from "./components/QFormFilterOffer";
import QSectionForm from "./components/QSectionForm";
import { getOffers } from "./api/OffersAPI";

const App: React.FC = () => {
  const [offers, setOffers] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [orderBy, setOrderBy] = useState("");

  const handleFilter = () => {
    const filtered = offers.filter((card) =>
      card.courseName.toLowerCase().includes(filterText.toLowerCase())
    );
  
    const sortedFilteredOffers = filtered.sort((a, b) => {
      if (orderBy === "course-name") {
        return a.courseName.localeCompare(b.courseName);
      } else if (orderBy === "price") {
        return a.offeredPrice - b.offeredPrice;
      } else if (orderBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });
  
    setFilteredOffers(sortedFilteredOffers);
  };
  

  useEffect(()=>{
    (async() =>{
      const data = await getOffers();
      setOffers(data);
      setFilteredOffers(data);
    })()
  }, [])

  useEffect(() => {
    handleFilter();
  }, [filterText, orderBy]);

  function capitalizeFirstLetter(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  function capitalizeFirstAndLastLetter(str: string): string {
    if (!str) return '';
  
    if (str.length === 1) {
      return str.toUpperCase();
    }
  
    return (
      str.charAt(0).toUpperCase() + 
      str.slice(1, str.length - 1) +
      str.charAt(str.length - 1).toUpperCase()
    );
  }

  function correctLevel(str: string): string{
    if(str == "bacharelado"){
      return "Graduação (bacharelado)"
    }else if(str == "tecnologo"){
      return "Graduação (tecnólogo)";
    }else{
      return "Graduação (licenciatura)"
    }
  }

  function calculatePercentage(original: number, discount: number){
    let pertencage = ((original-discount)/ original) * 100;
    return String(pertencage).slice(0, 2)+ "%";
  }

  function truncateString(str) {
    if (str.length > 16) {
      return str.slice(0, 16) + "...";
    }
    return str;
  }
  
  return (
    <QLayout
      header={
        <QHeader>
          <QInput
            type="search"
            id="site-search"
            name="q"
            placeholder="Busque o curso ideal para você"
            aria-label="Buscar cursos e bolsas"
            onChange={(e) => setFilterText(e.target.value)}
          />
          <QButton type="submit" onClick={handleFilter}>Buscar</QButton>
        </QHeader>
      }
      sidebar={<QFormFilterOffer />}
      footer={<QFooter />}
    >
      <QSectionForm
        title="Veja as opções que encontramos"
        orderBy={<QFormOrderByOffer onSelect={handleFilter}/>}
        filter={<QFormFilterOffer />}
      />

      <div className="mt-6">
        <QListCard cards={filteredOffers}>
          {(card) => (
            <QCardOffer
              key={card.id}
              courseName={truncateString(card.courseName)}
              rating={card.rating}
              fullPrice={String(card.fullPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}))}
              offeredPrice={String(card.offeredPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}))}
              discount={calculatePercentage(card.fullPrice, card.offeredPrice)}
              kind={card.kind == "presencial" ? capitalizeFirstLetter(card.kind) : capitalizeFirstAndLastLetter(card.kind)}
              level={correctLevel(card.level)}
              iesLogo={card.iesLogo}
              iesName={card.iesName}
            />
          )}
        </QListCard>
      </div>
    </QLayout>
  );
};

export default App;
