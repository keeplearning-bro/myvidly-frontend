import React, { Component } from 'react';
import auth from '../../services/authService';
import {Route, Redirect} from 'react-router-dom'

// component: Component 这是rename
const ProtectedRoute = ({path, component: Component, render, ...rest}) => {
  return (
    <Route
      // 这个path可以看作是rest中的一部分，所以可以省略了
      // path={path}
      {...rest}
      render={props => {
        if (!auth.getCurrentUser()) return <Redirect to={{
          pathname: "/login",
          state: {
            from: props.location
          }
        }} />
        return Component ? <Component {...props} />: render(props)
      }}
    />
  );
}
 
export default ProtectedRoute;

// class ProtectedRouter1 extends Component {
//   state = {  } 
//   render({path, component: Component, render, ...res}) { 
//     return (
//       <Route
//       path={path}
//       render={props => {
//         console.log('user111:', user);
//         if (!auth.getCurrentUser()) return <Redirect to="/login" />
//         return <MovieForm {...props} />
//       }}
//     />
//     );
//   }
// }
 

// export default ProtectedRouter1;