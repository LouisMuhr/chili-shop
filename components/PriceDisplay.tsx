type PriceDisplayProps = {
  originalPrice: number | string; // Erlaubt String für leere Admin-Eingaben
  discountPercent?: number | string;
  className?: string;
};

export default function PriceDisplay({ 
  originalPrice, 
  discountPercent = 0, 
  className = "" 
}: PriceDisplayProps) {
  
  // Konvertiere Eingaben sicher in Zahlen, Fallback auf 0
  const price = typeof originalPrice === "number" ? originalPrice : parseFloat(originalPrice) || 0;
  const discount = typeof discountPercent === "number" ? discountPercent : parseFloat(discountPercent) || 0;

  const hasDiscount = discount > 0;
  const finalPrice = price * (1 - discount / 100);

  // Wenn der Preis 0 ist, entscheiden wir hier, ob wir überhaupt etwas anzeigen wollen
  if (price === 0) return null; 

  return (
    <div className={`flex items-baseline gap-3 flex-wrap ${className}`}>
      {hasDiscount && (
        <span className="text-lg md:text-xl text-gray-500 line-through">
          {price.toFixed(2)}€
        </span>
      )}
      <span className="font-black text-[#e63946] tracking-tighter">
        {finalPrice.toFixed(2)}€
      </span>
    </div>
  );
}