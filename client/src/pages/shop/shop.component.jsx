import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Route } from "react-router-dom";

// import SHOP_DATA from "../../redux/shop/shop.data.js";

// import CollectionPreview from "../../components/collection-preview/collection-preview.component";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
// import { selectCollections } from "../../redux/shop/shop.selectors";

// import {
//   firestore,
//   convertCollectionsSnapshotToMap,
// } from "../../firebase/firebase.utils";

// import { updateCollections } from "../../redux/shop/shop.actions";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import {
  selectIsCollectionFetching,
  selectIsCollectionsLoading,
} from "../../redux/shop/shop.selectors";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

// because App page this is being used with is under a Route, route passes 3 components, match, location, and history.
// const ShopPage = ({ match, collections }) => {
//   console.log(match.path);
//   return (
//     <div className="shop-page">
//       <Route exact path={`${match.path}`} component={CollectionsOverview} />
//       <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
//     </div>
//   );
// };

// export default ShopPage;

class ShopPage extends React.Component {
  // state = {
  //   loading: true,
  // };

  // unsubscribeFromSnapshot = null;

  componentDidMount() {
    // const { updateCollections } = this.props;
    // const collectionRef = firestore.collection("collections");
    // fetch(
    //   "https://firestore.googleapis.com/v1/projects/crwn-db-91ebb/databases/(default)/documents/collections"
    // )
    //   .then((response) => response.json())
    //   .then((collections) => console.log(collections));
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
    //   async (onSnapshot) => {
    //     const collectionsMap = convertCollectionsSnapshotToMap(onSnapshot);
    //     updateCollections(collectionsMap);
    //     this.setState({ loading: false });
    //   }
    // );

    // another way to do this, but not really using a subscription model.
    // code has been moved to shop.actions for redux-thunk to take care of instead of being handled at this level.
    // collectionRef.get().then((onSnapshot) => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(onSnapshot);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });

    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { match, isCollectionLoaded } = this.props;
    // const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner
              isLoading={!isCollectionLoaded}
              {...props}
            />
          )}
          // component={CollectionsOverview}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner
              isLoading={!isCollectionLoaded}
              {...props}
            />
          )}
          // component={CollectionPage}
        />
      </div>
    );
  }
}

// export default ShopPage;

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

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionLoaded: selectIsCollectionsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  // updateCollections: (collectionsMap) =>
  //   dispatch(updateCollections(collectionsMap)),
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
