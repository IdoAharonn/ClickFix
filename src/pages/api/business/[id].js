import { getBusiness } from "@/server/db/db-services-clickFix";

export default async function handler(req, res) {
    const { id } = req.query;
    // const item = bookmarksMockServer.filter(item=> item.id === +id)[0];


    if (req.method === 'GET') {
        const item = await getBusiness(id);

        return res.status(200).json(item);
    }

    return res.status(404).end();
}
