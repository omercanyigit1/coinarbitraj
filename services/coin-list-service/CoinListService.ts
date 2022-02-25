import Http from '@/core/http';
import { FailedResponse, SuccessResponse} from '@/models';
import { ICoinListService, CoinListEndpoints } from '@/services';

const CoinListService: ICoinListService = {
    coinList: async () => {
        try {
            const resp = await Http.get(CoinListEndpoints.CoinList, { oauth: true, withCredentials: true });

            // eslint-disable-next-line no-console
            console.log('coinList-resp', resp);

            const response = new SuccessResponse<boolean>(true);

            return Promise.resolve(response);

        } catch (err) {
            const response = new FailedResponse<boolean>(err.code, err.message);

            return Promise.resolve(response);
        }
    }
};

Object.freeze(CoinListService);

export default CoinListService;