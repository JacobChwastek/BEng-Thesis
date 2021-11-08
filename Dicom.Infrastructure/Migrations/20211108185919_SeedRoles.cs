using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dicom.Infrastructure.Migrations
{
    public partial class SeedRoles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "roles",
                columns: new[] { "id", "name" },
                values: new object[,]
                {
                    { new Guid("94af0035-4e04-4954-87cc-e0be6e3205a2"), "Admin" },
                    { new Guid("60242c1e-0048-48fc-84bd-e42f708f1b46"), "User" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "roles",
                keyColumn: "id",
                keyValue: new Guid("60242c1e-0048-48fc-84bd-e42f708f1b46"));

            migrationBuilder.DeleteData(
                table: "roles",
                keyColumn: "id",
                keyValue: new Guid("94af0035-4e04-4954-87cc-e0be6e3205a2"));
        }
    }
}
