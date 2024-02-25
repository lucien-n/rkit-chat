import { createContext } from '../helpers/context';
import { Group } from '$shared/modules/groups/group.entity';

export const [getGroup, setGroup] = createContext<Group | null>('group');
