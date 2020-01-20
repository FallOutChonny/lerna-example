import { createBrowserHistory, History } from 'history'
import { appBaseName } from '../env'

const history = createBrowserHistory({ basename: appBaseName })

export default history as NonNullable<History>
