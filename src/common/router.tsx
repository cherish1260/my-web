import { Component } from 'react';
import { withRouter } from 'react-router';
import { matchRoutes, renderRoutes } from 'react-router-config';

interface urlTs {
  pathname: string;
  replace: any;
  component: any;
  match: any;
  route: urlTs;
  default: any;
}
interface PageProps {
  location: urlTs;
  history: urlTs;
  initialRoute: any;
  routes: any;
  [propsName: string]: any;
}

interface PageState {
  route: any;
}

class Router extends Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);
    this.state = {
      route: props.initialRoute,
    };
  }

  componentDidMount() {
    const { route } = this.state;
    const { location } = this.props;
    if (!route) this.match(location);
  }

  componentWillReceiveProps(nextProps: PageProps) {
    const { location } = this.props;
    if (location.pathname !== nextProps.location.pathname) {
      this.match(nextProps.location);
    }
  }

  shouldComponentUpdate(nextProps: PageProps, nextState: PageState) {
    return !!nextState.route.path;
  }

  match = (location: urlTs) => {
    const { routes, history } = this.props;
    const curRoute = matchRoutes(routes, location.pathname)
      .filter((route: urlTs) => route.match.isExact)
      .map((route: urlTs) => route.route)[0];

    if (curRoute && curRoute.component) {
      if (curRoute.component.prototype instanceof Component || curRoute._isLoaded) {
        this.updateRoute(curRoute);
      } else {
        this.updateRoute();
        curRoute.component().then((mod: urlTs) => {
          curRoute.component = mod.default || mod;
          curRoute._isLoaded = true;
          this.updateRoute(curRoute);
        });
      }
    } else {
      history.replace('/error/404');
    }
  }

  updateRoute = (curRoute?: urlTs) => {
    if (!curRoute || !curRoute.component) {
      this.setState({ route: {} });
    } else {
      this.setState({ route: curRoute });
    }
  }

  render() {
    const { route } = this.state;
    return renderRoutes(route ? [route] : []);
  }
}

export default withRouter(Router);
