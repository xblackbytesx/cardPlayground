import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/app.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


// class Breakpoint extends Component {
//
//     onBreakpointChange() {
//         this.setState({
//             mobile: false,
//             tablet: true,
//             desktop: false
//         })
//     }
//
//     render() {
//         this.props.children(this.state);
//     }
// }
//
//
// class Product extends Component {
//
//     render() {
//         return (
//             <Breakpoint>
//                 {({mobile, tablet}) => (
//                     <div>
//                         {mobile && (
//                             <div>test
//                                 <ProductMobile />
//                             </div>
//                         )}
//                         {tablet && <ProductTablet />}
//                     </div>
//                 )}
//             </Breakpoint>
//         );
//     }
// }
