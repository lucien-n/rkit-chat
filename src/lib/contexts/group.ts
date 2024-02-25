import { Group } from '$shared/modules/groups/group.entity';
import { createContext } from './context';

export const [getGroup, setGroup] = createContext<Group | null>('group');
