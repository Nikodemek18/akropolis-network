import build, { getParam } from 'shared/helpers/buildRouteTree';

const rawTree = {
  dao: {
    view: {
      id: getParam({
        section: getParam(null),
      }),
    },
  },
  daos: null,
};

const routes = build(rawTree);

export default routes;
