import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ProgressBar from '../progressBar'
import styles from './styles.module.scss'


type Props = {
  data: ICardData;
  cardClick: React.MouseEventHandler<HTMLDivElement>;
}
const StudyCard: React.FC<Props> = ({ data, cardClick }) => {

  const { t } = useTranslation()
  let value = 0

  const [totalCount, setTotalCount] = useState(0)
  const [displayArray, setDisplayArray] = useState<ICardItem[]>([])

  useEffect(() => {
    if (data.statuses.length > 0) {
      data.statuses.forEach(item => {
        value += item.count
      })
      setTotalCount(value)
    }
    const Array = data.statuses.sort((first, second) => {
      if (first['order'] > second['order']) return 1
      else if (first['order'] < second['order']) return -1
      return 0
    })
    setDisplayArray(Array)
  }, [data])

  return (
    <div className={styles.root} onClick={cardClick}>
      <div className={styles.title}>
        <div className={styles.label}>
          {data.study}
        </div>
        <div className={styles.num}>
          <div className={styles.back} aira-role="StudyCard-titleNum">
            {totalCount}
          </div>
        </div>
      </div>
      <div className={styles.body}>
        {
          displayArray.length > 0 &&
          displayArray.map((item: ICardItem, index: number) => (
            <div className={styles.item} key={index}>
              <div className={styles.label}>{item.label}</div>
              <ProgressBar progress={item.count} total={totalCount} barBackGroundColor={item.color} className={styles.progressbar} />
            </div>
          ))
        }
      </div>
    </div>
  )
}
export default StudyCard
