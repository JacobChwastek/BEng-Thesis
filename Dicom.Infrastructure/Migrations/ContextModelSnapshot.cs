﻿// <auto-generated />
using System;
using Dicom.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Dicom.Infrastructure.Migrations
{
    [DbContext(typeof(Context))]
    partial class ContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.11")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("Dicom.Entity.Dicom.Dicom", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("created_at");

                    b.Property<bool>("Deleted")
                        .HasColumnType("boolean")
                        .HasColumnName("deleted");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("deleted_at");

                    b.Property<string>("FileName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("file_name");

                    b.Property<long>("FileSize")
                        .HasColumnType("bigint")
                        .HasColumnName("file_size");

                    b.Property<DateTime?>("LastModifiedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("last_modified_at");

                    b.Property<string>("Path")
                        .HasColumnType("text")
                        .HasColumnName("path");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid")
                        .HasColumnName("user_id");

                    b.HasKey("Id")
                        .HasName("pk_dicom");

                    b.HasIndex("UserId")
                        .HasDatabaseName("ix_dicom_user_id");

                    b.ToTable("dicom");
                });

            modelBuilder.Entity("Dicom.Entity.Dicom.DicomDocumentation", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("created_at");

                    b.Property<bool>("Deleted")
                        .HasColumnType("boolean")
                        .HasColumnName("deleted");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("deleted_at");

                    b.Property<Guid>("DicomId")
                        .HasColumnType("uuid")
                        .HasColumnName("dicom_id");

                    b.Property<DateTime?>("LastModifiedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("last_modified_at");

                    b.HasKey("Id")
                        .HasName("pk_dicom_documentation");

                    b.HasIndex("DicomId")
                        .HasDatabaseName("ix_dicom_documentation_dicom_id");

                    b.ToTable("dicom_documentation");
                });

            modelBuilder.Entity("Dicom.Entity.Dicom.DocumentationImage", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("created_at");

                    b.Property<Guid>("DicomDocumentationId")
                        .HasColumnType("uuid")
                        .HasColumnName("dicom_documentation_id");

                    b.Property<string>("DrawLayerImage")
                        .HasColumnType("text")
                        .HasColumnName("draw_layer_image");

                    b.Property<DateTime?>("LastModifiedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("last_modified_at");

                    b.Property<string>("ViewLayerImage")
                        .HasColumnType("text")
                        .HasColumnName("view_layer_image");

                    b.HasKey("Id")
                        .HasName("pk_documentation_image");

                    b.HasIndex("DicomDocumentationId")
                        .HasDatabaseName("ix_documentation_image_dicom_documentation_id");

                    b.ToTable("documentation_image");
                });

            modelBuilder.Entity("Dicom.Entity.Dicom.DwvConfiguration", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("Configuration")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("configuration");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("created_at");

                    b.Property<Guid?>("DicomId")
                        .HasColumnType("uuid")
                        .HasColumnName("dicom_id");

                    b.Property<DateTime?>("LastModifiedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("last_modified_at");

                    b.HasKey("Id")
                        .HasName("pk_dwv_configurations");

                    b.HasIndex("DicomId")
                        .HasDatabaseName("ix_dwv_configurations_dicom_id");

                    b.ToTable("dwv_configurations");
                });

            modelBuilder.Entity("Dicom.Entity.Identity.Role", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("created_at");

                    b.Property<DateTime?>("LastModifiedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("last_modified_at");

                    b.Property<string>("Name")
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.HasKey("Id")
                        .HasName("pk_roles");

                    b.HasIndex("Name")
                        .IsUnique()
                        .HasDatabaseName("ix_roles_name");

                    b.ToTable("roles");

                    b.HasData(
                        new
                        {
                            Id = new Guid("94af0035-4e04-4954-87cc-e0be6e3205a2"),
                            CreatedAt = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Admin"
                        },
                        new
                        {
                            Id = new Guid("60242c1e-0048-48fc-84bd-e42f708f1b46"),
                            CreatedAt = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "User"
                        });
                });

            modelBuilder.Entity("Dicom.Entity.Identity.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("created_at");

                    b.Property<string>("Email")
                        .HasMaxLength(40)
                        .HasColumnType("character varying(40)")
                        .HasColumnName("email");

                    b.Property<string>("FirstName")
                        .HasMaxLength(40)
                        .HasColumnType("character varying(40)")
                        .HasColumnName("first_name");

                    b.Property<DateTime?>("LastModifiedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("last_modified_at");

                    b.Property<string>("LastName")
                        .HasMaxLength(40)
                        .HasColumnType("character varying(40)")
                        .HasColumnName("last_name");

                    b.Property<string>("Password")
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)")
                        .HasColumnName("password");

                    b.Property<string>("PhoneNumber")
                        .HasMaxLength(40)
                        .HasColumnType("character varying(40)")
                        .HasColumnName("phone_number");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("uuid")
                        .HasColumnName("role_id");

                    b.Property<string>("Salt")
                        .HasColumnType("text")
                        .HasColumnName("salt");

                    b.HasKey("Id")
                        .HasName("pk_users");

                    b.HasIndex("Email")
                        .IsUnique()
                        .HasDatabaseName("ix_users_email");

                    b.HasIndex("RoleId")
                        .HasDatabaseName("ix_users_role_id");

                    b.ToTable("users");
                });

            modelBuilder.Entity("Dicom.Entity.Volume", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("created_at");

                    b.Property<string>("Host")
                        .HasColumnType("text")
                        .HasColumnName("host");

                    b.Property<DateTime?>("LastModifiedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("last_modified_at");

                    b.Property<string>("Path")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("path");

                    b.HasKey("Id")
                        .HasName("pk_volumes");

                    b.ToTable("volumes");

                    b.HasData(
                        new
                        {
                            Id = new Guid("f61f2648-1ee5-4889-999a-8baa0dd6fa6a"),
                            CreatedAt = new DateTime(2021, 11, 14, 19, 0, 0, 0, DateTimeKind.Unspecified),
                            Host = "",
                            LastModifiedAt = new DateTime(2021, 11, 14, 19, 0, 0, 0, DateTimeKind.Unspecified),
                            Path = "D:\\Projects\\Software\\dicom\\Assets"
                        });
                });

            modelBuilder.Entity("Dicom.Entity.Dicom.Dicom", b =>
                {
                    b.HasOne("Dicom.Entity.Identity.User", "User")
                        .WithMany("Dicoms")
                        .HasForeignKey("UserId")
                        .HasConstraintName("fk_dicom_users_user_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Dicom.Entity.Dicom.DicomDocumentation", b =>
                {
                    b.HasOne("Dicom.Entity.Dicom.Dicom", "Dicom")
                        .WithMany("Documentations")
                        .HasForeignKey("DicomId")
                        .HasConstraintName("fk_dicom_documentation_dicom_dicom_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Dicom");
                });

            modelBuilder.Entity("Dicom.Entity.Dicom.DocumentationImage", b =>
                {
                    b.HasOne("Dicom.Entity.Dicom.DicomDocumentation", "DicomDocumentation")
                        .WithMany("DocumentationImages")
                        .HasForeignKey("DicomDocumentationId")
                        .HasConstraintName("fk_documentation_image_dicom_documentation_dicom_documentation")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("DicomDocumentation");
                });

            modelBuilder.Entity("Dicom.Entity.Dicom.DwvConfiguration", b =>
                {
                    b.HasOne("Dicom.Entity.Dicom.Dicom", "Dicom")
                        .WithMany("DwvConfigurations")
                        .HasForeignKey("DicomId")
                        .HasConstraintName("fk_dwv_configurations_dicom_dicom_id");

                    b.Navigation("Dicom");
                });

            modelBuilder.Entity("Dicom.Entity.Identity.User", b =>
                {
                    b.HasOne("Dicom.Entity.Identity.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .HasConstraintName("fk_users_roles_role_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });

            modelBuilder.Entity("Dicom.Entity.Dicom.Dicom", b =>
                {
                    b.Navigation("Documentations");

                    b.Navigation("DwvConfigurations");
                });

            modelBuilder.Entity("Dicom.Entity.Dicom.DicomDocumentation", b =>
                {
                    b.Navigation("DocumentationImages");
                });

            modelBuilder.Entity("Dicom.Entity.Identity.Role", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("Dicom.Entity.Identity.User", b =>
                {
                    b.Navigation("Dicoms");
                });
#pragma warning restore 612, 618
        }
    }
}
