exports.getAllUsers = (req, res) => {
    res.status(200).json([{
        name: 'Pedro',
    }])
}

exports.createUser = (req, res) => {
    const name = req.body.name;

    res.status(201).json({
        message: 'User succesfully created!',
        user: {
            name
        }
    })}

