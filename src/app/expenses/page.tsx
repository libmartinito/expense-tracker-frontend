export default async function Expenses() {
  const response = await fetch("http://127.0.0.1:4010/expenses").then((res) => res.json())

  return (
    <div className="container mx-auto px-8 max-w-3xl sm:px-16">
      <div className="text-center text-6xl sm:text-8xl">expenses</div>

      <ul>
        {response.data.map((item: any) => (
          <li key={item.key}>item: {item.attributes.item}, amount: {item.attributes.amount}, currency: {item.attributes.currency}</li>
        ))}
      </ul>
    </div>
  )
}
