import React from 'react';
import ShopPage from '../../pages/shop/shop.component';

import './preview-collection.styles.scss';

const CollectionPreview = ( {title, items} ) => {
  console.log(title, items);
  return (
  <div className="collection-preview">
    <h1 className="title">{title.toUpperCase()}</h1>
    <div className="preview">
      {items
        .filter((item, idx) => idx < 4)
        .map((item) => (
          <div key={item.id}>{item.name}</div>
        ))
      }
    </div>
  </div>
  )
}

export default CollectionPreview;