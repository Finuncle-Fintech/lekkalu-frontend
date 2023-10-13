export default function ContainerBalanceCard({ children }) {
  return (
    <div
      style={{
        height: 'content-fit',
        borderRadius: '2rem',
        padding: '2rem',
        backgroundColor: 'white',
      }}
    >
      {children}
    </div>
  )
}
