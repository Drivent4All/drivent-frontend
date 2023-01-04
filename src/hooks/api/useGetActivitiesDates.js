import useAsync from '../useAsync';
import useToken from '../useToken';
import * as activitiesApi from '../../services/activitiesApi';

export default function useGetRoom() {
  const token = useToken();

  const {
    data: activities,
    loading: activitiesLoading,
    error: activitiesError,
    act: getActivitiesDates,
  } = useAsync(() => activitiesApi.getAcitivitiesDates(token), false);

  return {
    activities,
    activitiesLoading,
    activitiesError,
    getActivitiesDates
  };
}
//
