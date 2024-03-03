<script lang="ts">
	import * as Card from '$shadcn/card';
	import type { User } from '$shared/modules/users/user.entity';
	import { Large } from '$typography';
	import UserMini from '$ui/user/user-mini.svelte';
	import * as AlertDialog from '$shadcn/alert-dialog';
	import { contry } from '$helpers/contry';
	import { FriendsController } from '$shared/modules/friends/friends.controller';
	import { toast } from 'svelte-sonner';
	import { Button } from '$shadcn/button';

	export let user: User;

	const handleRemoveFriend = (friend: User) => {
		contry(
			async () => {
				await FriendsController.remove(friend.id);
			},
			() => toast.success(`You removed ${friend.handle} from your friends`),
			() => toast.error(`Couldn't remove ${friend.handle} from your friends`)
		);
	};
</script>

<Card.Root class="flex items-center">
	<Card.Content class="flex w-full items-center gap-5 p-3">
		<UserMini {user} />
		<Large>{user.username}</Large>
		<div class="ml-auto">
			<AlertDialog.Root>
				<AlertDialog.Trigger asChild let:builder>
					<Button builders={[builder]} variant="destructive">Remove</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Header>
						<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
						<AlertDialog.Description>
							This action cannot be undone. You will have to send a new friend request to this user.
						</AlertDialog.Description>
					</AlertDialog.Header>
					<AlertDialog.Footer>
						<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
						<AlertDialog.Action on:click={() => handleRemoveFriend(user)}
							>Continue</AlertDialog.Action
						>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</div>
	</Card.Content>
</Card.Root>
