class Note {
  static async signIn(req, res, next) {
    try {
      return res.status(200).json({ message: "mantap" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = Note;
