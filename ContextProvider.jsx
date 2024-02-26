Context provider
// create context provider and consumer
const UserContext = React.createContext();
export default UserContext;
// wrap part of your app (or whole app) 
// with Provider that needs access to user
class App extends React.Component {
  constructor() {
    super();
    this.state = {
       user: null  
    };
  }

  componentDidMount() {
    yourUserAPI().then(user => this.setState({ user }));
  }

  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        <MyComponent />
      </UserContext.Provider>
    );
  }
}
Context consumer
A) Current standard
// use anywhere in your app like this
// PS! must be descendant of Provider
class MyComponent extends React.Component {
  render() {
    return (
      <UserContext.Consumer>
        {user => {
          // do stuff with 'user'
        }}
      </UserContext.Consumer>
    );
  }
}
B) React Hooks (IN ALPHA)
// only works with functional 
// components (no classes)
function MyComponent() {
  const user = React.useContext(UserContext.Consumer);
  // do stuff with 'user'
  return 'something';
}
