// app/checkout/success/page.tsx
export default function Success() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center text-center px-6">
      <div>
        <h1 className="text-6xl font-black text-green-500 mb-8">Zahlung erfolgreich!</h1>
        <p className="text-2xl">Vielen Dank für deinen Einkauf</p>
      </div>
    </div>
  );
}