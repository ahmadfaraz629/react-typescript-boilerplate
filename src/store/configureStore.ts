import prod from 'store/configureStore.prod';
import dev from 'store/configureStore.dev';

export default process.env.NODE_ENV === 'production' ? prod : dev;
