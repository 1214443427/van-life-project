import React, { Suspense, useEffect, useState } from 'react'
import { getUserIncome } from '../../api'
import { allMonths, requireAuth } from '../../util'
import { Await, defer, useLoaderData } from 'react-router-dom'
import DropDownMenu from './DropDownMenu'

export function loader(uid, request){
  requireAuth(uid, request)
  return defer({incomeData: getUserIncome(uid)})
}

function HostIncome() {

  const loaderData = useLoaderData()
  const [dateOffset, setDateOffset] = useState(30)
  const currentDate = new Date(Date.parse("Oct 11 2023"))//new Date()
  const dateCutoff = new Date().setDate(currentDate.getDate() - dateOffset);

  useEffect(() => {
    new Date(dateCutoff).setDate(currentDate.getDate()-dateOffset)
  }, [dateOffset])


  function renderTransactionsDiv(transactions){
    return (transactions.map(transaction=>(
      <div className='transaction-card' key={transaction.id}>
        <h1>${transaction.amount}</h1>
        <p>{new Date(transaction.time).toLocaleDateString()}</p>
      </div>
    )))
  }

  function renderMonthlyIncomeChart(transactions,dateCutoff){
    const monthlyIncome = Array(6).fill(0)
    const startingMonth = (currentDate.getMonth()+12-5)%12
    const lastSixMonthDate = new Date(currentDate.getFullYear(), startingMonth, 0)
    const lastSixMonthTransaction = transactions.filter(transaction=>transaction.time>lastSixMonthDate)
    for (let index = 0; index < 6; index++) {
      const indexedMonthTransactions = lastSixMonthTransaction.filter(transaction=>new Date(transaction.time).getMonth()==(startingMonth+index)%12)
      monthlyIncome[index] = indexedMonthTransactions?.reduce((total,transaction)=>total+transaction.amount, 0)
    }
    const maxMonthlyIncome = Math.max(...monthlyIncome)
    const amountPerRow = Math.ceil(maxMonthlyIncome/1000)/5
    const detailView = amountPerRow  <= 0.2
    const maxAmount= Math.ceil(amountPerRow)*5
    const cutOffMonth = new Date(dateCutoff).getMonth()
    console.log(monthlyIncome, maxAmount, amountPerRow)

    function calculateColor(currentMonth, cutOffMonth){
      if(currentMonth>=cutOffMonth) return "orange"
      if(cutOffMonth>=7){
        return currentMonth <= cutOffMonth%6 ? "orange":"#FFEAD0"
      }
      return "#FFEAD0"
    }

    return (
      <div className='monthly-income-chart'>
        <div className='vertical-axis'>
          {monthlyIncome.map((_, index)=>(
            <div className='income-chart-row-div' key={index}>
              <p>${maxAmount/5*(5-index)}{5-index==0?"":"k"}</p>
              <div className='dashed-line'></div>
            </div>
          ))}
        </div>
        <div className="horizontal-axis" style={{bottom:`${-197+11+maxMonthlyIncome/maxAmount*0.197}px`}}>
          {monthlyIncome.map((value, index)=>(
            <div className='income-chart-column-div' key={index}>
              <div className='income-chart-bar' 
                style={{height:`${value/maxAmount/10}%`, 
                backgroundColor:`${calculateColor(index+startingMonth, cutOffMonth)}`}}></div>
              <p>{allMonths[index+startingMonth]}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  function renderHostIncomeDiv(transactions){
    const cutOffTransactions = transactions.filter(transaction=>transaction.time>dateCutoff)
    const incomeSinceCutOff = cutOffTransactions.reduce((total, transaction)=>
      (total + transaction.amount)
    , 0)
    const numOfTransactions = cutOffTransactions.reduce((x,_)=>x+1,0)

    return(
      <div className="host-income-div">
        <h1>Income</h1>
        <div className='host-income-span'>
          <h1>${incomeSinceCutOff}</h1>
          <DropDownMenu dateOffset={dateOffset} setDateOffset={setDateOffset}/>
        </div>
        {renderMonthlyIncomeChart(transactions, dateCutoff)}
        <div className='transactions-div'>
          <div className='transaction-span'>
            <h3>Your transactions ({numOfTransactions})</h3>
            <DropDownMenu dateOffset={dateOffset} setDateOffset={setDateOffset}/>
          </div>
          {renderTransactionsDiv(cutOffTransactions)}
        </div>
      </div>
    )
  }

  return (
    <Suspense>
      <Await resolve={loaderData.incomeData}>  
        {renderHostIncomeDiv}
      </Await>
    </Suspense>
  )
}

export default HostIncome