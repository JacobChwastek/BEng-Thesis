using Dicom.Application.Services;
using FluentAssertions;
using System.Threading.Tasks;
using Xunit;

namespace Dicom.Test
{
    public class AuthenticationServiceTest
    {
        private const string _password = "password";

        [Fact]
        public async Task GenerateHashTest()
        {
      
            //Act
            var (hash, _) = AuthenticationService.GenerateHashPasswordAndSalt(_password);

            //Assert
            Assert.NotEmpty(hash);

            //Example with fluentAssertion
            _password.Should().NotMatch(hash);
        }
        
   
        [Fact]
        public async Task GenerateSaltTest()
        {

            //Act
            var (_, salt) = AuthenticationService.GenerateHashPasswordAndSalt(_password);

            //Assert
            Assert.NotEmpty(salt);
     
        }

        [Fact]
        public async Task HashHashValidLength()
        {
            //Act
            var (hash, _) = AuthenticationService.GenerateHashPasswordAndSalt(_password);

            //Assert
            Assert.Equal(44, hash.Length);
        }

        [Fact]
        public async Task CheckPasswordCorrectPasswordAsync()
        {
            //Arrange
            var (hash, salt) = AuthenticationService.GenerateHashPasswordAndSalt(_password);

            //Act
            var isPasswordCorrect = AuthenticationService.CheckPasswordAsync(hash, salt, _password);

            //Assert
            Assert.True(isPasswordCorrect);
        }
    }
}
