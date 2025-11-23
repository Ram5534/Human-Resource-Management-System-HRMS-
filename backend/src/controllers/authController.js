
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Organisation } = require("../models");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { name, email, password, organisation_id } = req.body;

    // Check if the organisation exists
    let org = await Organisation.findByPk(organisation_id);
    if (!org) {
      // Optionally create a default organisation
      org = await Organisation.create({ id: organisation_id, name: `Org-${organisation_id}` });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      organisation_id: org.id
    });

    res.json({ message: "User registered successfully", userId: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


exports.login = async (req, res) => {
try {
const { email, password } = req.body;


const user = await User.findOne({ where: { email } });
if (!user) return res.status(404).json({ error: "User not found" });


const valid = await bcrypt.compare(password, user.password);
if (!valid) return res.status(401).json({ error: "Invalid password" });


const token = jwt.sign(
{ id: user.id, org: user.organisation_id },
process.env.JWT_SECRET,
{ expiresIn: "7d" }
);


res.json({ token });
} catch (err) {
res.status(500).json({ error: err.message });
}
};