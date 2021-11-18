using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dicom.Infrastructure.Migrations
{
    public partial class SeedVolumes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "volumes",
                columns: new[] { "id", "created_at", "host", "last_modified_at", "path" },
                values: new object[] { new Guid("f61f2648-1ee5-4889-999a-8baa0dd6fa6a"), new DateTime(2021, 11, 14, 19, 0, 0, 0, DateTimeKind.Unspecified), "", new DateTime(2021, 11, 14, 19, 0, 0, 0, DateTimeKind.Unspecified), "D:\\Projects\\Software\\dicom\\Assets" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "volumes",
                keyColumn: "id",
                keyValue: new Guid("f61f2648-1ee5-4889-999a-8baa0dd6fa6a"));
        }
    }
}
