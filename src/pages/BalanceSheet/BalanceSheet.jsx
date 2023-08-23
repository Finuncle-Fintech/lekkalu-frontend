import AssetsCard from 'components/BalanceSheet/BalanceCard'
import styles from './BalanceSheet.module.css'
import { AssetsLiabilitiesChart } from 'components/Charts/AssetsLiabilitiesChart'
import { useContext } from 'react'
import { Context } from 'provider/Provider'
import BalanceCardLong from 'components/BalanceSheet/BalanceCardLong'
import searchIcon from 'assets/search-icon.svg'

export default function BalanceSheet(){

    const { assets, liabilities } = useContext(Context)

    return( 
    <main className={styles.main}>

        <div className='container-fluid d-flex justify-content-center align-items-center'>
            <div className={styles.containerSearch}>
                <input type="search" name="" id="" className={styles.search} placeholder='Search...' autoComplete='off' />
                <img src={searchIcon} width={30} alt="" />
            </div>
        </div>

        <div className='d-flex justify-content-between container-fluid'>
            <AssetsCard title={'Assets'} component={<AssetsLiabilitiesChart data={assets} type={'assets'} />} />
            <AssetsCard title={'Liabilities'} component={<AssetsLiabilitiesChart data={liabilities} type={'liabilities'} />} />
        </div>
        
        <div className='container-fluid'>
            <BalanceCardLong assets={assets} liabilities={liabilities} />
        </div>

    </main>
    )
}