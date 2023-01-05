import useAsync from '../useAsync';
import useToken from '../useToken';
import * as activitiesApi from '../../services/activitiesApi';

export default function useGetActivitiesByDay() {
  const token = useToken();

  const {
    data: activities,
    loading: activitiesLoading,
    error: activitiesError,
    act: getActivities,
  } = useAsync((date) => activitiesApi.getActivitiesByDay(token, date), false);

  return {
    activities,
    activitiesLoading,
    activitiesError,
    getActivities
  };
}
//
