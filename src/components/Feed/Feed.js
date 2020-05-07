// @flow strict
import React from 'react';
import moment from 'moment';
import 'moment/locale/ru'
import { Link } from 'gatsby';
import styles from './Feed.module.scss';
// moment.lang('ru')
// type Props = {
//   edges: Edges
// };
const Feed = ({ items }) => (
  <div className={styles['feed']}>
    {items.map((item) => (
      <div className={styles['feed__item']} key={item.publishUrl}>
          <h2 className={styles['feed__item-title']}>
          <Link className={styles['feed__item-title-link']} to={item.publishUrl}>{item.TITLE}</Link>
        </h2>
        {/* <div className={styles['feed__item-meta']}>
          <time className={styles['feed__item-meta-time']} dateTime={moment(item.PUBDATE).format('MMMM D, YYYY')}>
            { moment(item.PUBDATE).format('MMMM YYYY') }
          </time>
          <span className={styles['feed__item-meta-divider']} />
         <span className={styles['feed__item-meta-category']}>
            <Link to={item.publishUrl} className={styles['feed__item-meta-category-link']}>{item.publishUrl}</Link>
          </span> 
        </div> */}

        <div className={styles['feed__item-description']} dangerouslySetInnerHTML={{ __html: item.DESCR }} />
        { item.type !== 'n'  &&
        <Link className={styles['feed__item-readmore']} to={item.publishUrl}>{'..>>'}</Link> }
      </div>
    ))}
  </div>
);
export default Feed;
