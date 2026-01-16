module.exports = async ({ to, subject, text }) => {
  console.log("📧 Email sent to:", to);
  console.log("Subject:", subject);
  console.log("Text:", text);
};
