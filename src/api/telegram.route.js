/**
 * Created by fabrizio on 22/04/16.
 */

export default (router, chatter, logger) => {
	router.post('/updates', async(ctx) => {
		chatter.processRequest(ctx.request.body);
		ctx.status = 200;
	});
};