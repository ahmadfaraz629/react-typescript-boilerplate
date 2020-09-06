export interface IAction {
  type: string;
  payload?: any;
}

const createTypes = action => {
  const actions = {};
  ['request', 'success', 'failed'].forEach(type => {
    actions[type] = `${action}_${type.toUpperCase()}`;
  });
  return actions;
};

export const user = {
  LOGIN_USER: createTypes('LOGIN_USER'),
  REGISTER_USER: 'REGISTER_USER',
  CURRENT_USER: 'CURRENT_USER'
};
