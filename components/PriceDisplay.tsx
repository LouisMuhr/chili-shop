
type PriceDisplayProps = {
  originalPrice: number;
  discountPercent?: number;
  className?: string;
};

export default function PriceDisplay({ originalPrice, discountPercent = 0, className = "" }: PriceDisplayProps) {
  const hasDiscount = discountPercent > 0;
  const finalPrice = originalPrice * (1 - discountPercent / 100);

  return (
    <div className={`flex items-baseline gap-3 flex-wrap ${className}`}>
      {hasDiscount && (
        <span className="text-lg md:text-xl text-gray-500 line-through">
          {originalPrice.toFixed(2)}€
        </span>
      )}
      <span className="font-black text-[#e63946] tracking-tighter">
        {finalPrice.toFixed(2)}€
      </span>
    </div>
  );
}