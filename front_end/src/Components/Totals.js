import React from 'react'

export default ({ totalBuys, totalSales, totalProfit, t }) => (
  <>
    <h3>{t('totals')}</h3>
    <div className="inputDiv">
      <span>
        <p>{t('totalBuys')}:{' '}{totalBuys.toFixed(2)}</p>
      </span>
      <span>
        <p>{t('totalSales')}:{' '}{totalSales.toFixed(2)}</p>
      </span>
      <span>
        <p>{t('totalProfit')}:{' '}
        {totalProfit.toFixed(2)}</p>
      </span>
    </div>
  </>
)
