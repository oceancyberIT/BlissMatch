async function main() {
  // Add any required seed data here.
  // Currently, we do not create sample enquiries in production.
  console.log("Prisma seed: nothing to seed yet.");
}

main()
  .catch((error) => {
    console.error("Prisma seed error:", error);
    process.exit(1);
  })
  .finally(async () => {
    // No resources to clean up yet.
  });

