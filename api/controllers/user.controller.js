export const test = (req, res)=>{
    try {
        res.status(200).json({message:"Test api working"});
    } catch (error) {
        res.status(400).json({message:"error in api creation"});
    }
}