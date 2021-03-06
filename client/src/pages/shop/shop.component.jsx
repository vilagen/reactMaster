import React from "react";
// import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";
import { Route } from "react-router-dom";

// import SHOP_DATA from "../../redux/shop/shop.data.js";

// import CollectionPreview from "../../components/collection-preview/collection-preview.component";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
// import { selectCollections } from "../../redux/shop/shop.selectors";

// because App page this is being used with is under a Route, route passes 3 components, match, location, and history.
const ShopPage = ({ match, collections }) => {
  console.log(match.path);
  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
  );
};

export default ShopPage;

// const ShopPage = ({ collections }) => {
//   return (
//     <div className="shop-page">
//       {collections.map(({ id, ...otherCollectionProps }) => (
//         <CollectionPreview key={id} {...otherCollectionProps} />
//       ))}
//     </div>
//   );
// };

// const mapStateToProps = createStructuredSelector({
//   collections: selectCollections,
// });

// class ShopPage extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       collections: SHOP_DATA,
//     };
//   }

//   render() {
//     const { collections } = this.state;
//     return (
//       <div className="shop-page">
//         {collections.map(({ id, ...otherCollectionProps }) => (
//           <CollectionPreview key={id} {...otherCollectionProps} />
//         ))}
//       </div>
//     );
//   }
// }

// export default connect(mapStateToProps)(ShopPage);
