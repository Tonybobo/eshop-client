import { Modal, Box, Typography } from '@mui/material';
import { useContext } from 'react';
import { Context } from './../Context';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4
};
function GamesModal() {
	const [context, setContext] = useContext(Context);
	console.log(context.data);
	return (
		<Modal
			open={context.open}
			onClose={() => setContext({ open: false, data: {} })}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description">
			<Box sx={style}>
				<Typography
					id="modal-modal-title"
					variant="h6"
					color="white"
					component="h2">
					Text in a modal
				</Typography>
			</Box>
		</Modal>
	);
}
export default GamesModal;
