import ContainerBalanceCard from './ContainerBalanceCard'
import TableBalance from './TableBalance'

export default function BalanceCardLong({ assets, liabilities }) {
  return (
    <ContainerBalanceCard>
      <article style={{ width: '100%' }}>
        <div className='d-flex justify-content-between align-items-start gap-5 flex-column flex-lg-row'>
          <TableBalance data={assets} title={'Assets'} />
          <TableBalance data={liabilities} title={'Liabilities'} />
        </div>
      </article>
    </ContainerBalanceCard>
  )
}
