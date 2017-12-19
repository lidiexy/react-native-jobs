import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import reducers from '../reducers';

/*let store = createStore(
    reducers,
    undefined,
    compose(
        applyMiddleware(thunk)
    )
);

let persistor = persistStore(store);*/

export const configureStore = () => {
    const store = createStore(
        reducers,
        undefined,
        compose(
            applyMiddleware(thunk),
        )
    );
    const persistor = persistStore(store);

    return { persistor, store };
};

// export default { persistor, store };