import * as _ from 'lodash';
import * as express from 'express';
import * as path from 'path';
import * as webpack from 'webpack';
import users from './routes/Users';
import auth from './routes/Auth';
import idea from './routes/Idea';
const config = require('config');
const wds = require('webpack-dev-middleware');
const whm = require('webpack-hot-middleware');
const bodyParser = require('body-parser');

interface IConfig {
    output: {
        publicPath: String;
    };
    server: {
        port: Number;
        host: String;
    };
}
interface IServerConfig {
    port: Number;
    host: String;
}

const webpackConfig = _.omit<IConfig, {}>(config.webpack.browser, 'watch');
const serverConfig: IServerConfig = config.server;
const app = express();

app.use(bodyParser.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/idea', idea);

app.use(express.static(path.join(__dirname, 'build')));
if (process.env.NODE_ENV !== 'production') {
    const compiler = webpack(<Object>webpackConfig);

    app.use(wds(compiler, {
        publicPath: webpackConfig.output.publicPath,
    }));

    app.use(whm(compiler));
}

app.get('*', (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(serverConfig.port, () => {
    console.log(`Listening at http://localhost:${serverConfig.port}/`);
});
